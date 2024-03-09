/**
 * @file langCompiler.js transforms instructions from EditorTabPanel to a fragment shader.
 * @author Beckett Avary
 * @project Emergent Playground
 */

/*
ERROR: 0:19: 'lessThanEquals' : no matching overloaded function found
ERROR: 0:19: 'all' : no matching overloaded function found
ERROR: 0:19: 'return' : function return is not matching type:
ERROR: 0:55: 'curr' : undeclared identifier
ERROR: 0:55: 'eq' : no matching overloaded function found
ERROR: 0:55: '' : boolean expression expected
*/

/**
 * langCompiler is a function that takes a String instruction of shader-lang format and transforms it to GLSL ES 3.0 code.
 *
 * @param {string} inst - The input instruction code.
 * @param {boolean} include_self - Whether to include current cell in identification.
 * @param {number} range - Integer size of neighborhood in identification.
 * @param {string} neighborhood - Type of neighborhood. 
 * @param {Array[{string, string}]} colors - ONLY USE langTupleList here!!!
 *
 * @returns {string} frag - The resultant GLSL ES 3.0 code.
 */
function langCompiler(code, colors, include_self, range, neighborhood, background){
    let frag = '#version 300 es\n\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nin vec2 vTexCoord;\nout vec4 out_col;\n\nuniform sampler2D previousState;\nuniform vec2 resolution;\nuniform float pause;\n\n//CONSTS\n\nbool eq(vec4 c1, vec4 c2){\n\treturn all(lessThanEqual(abs(c1 - c2), vec4(0.01)));\n}\n\nvoid main(){\n\tvec2 uv = vTexCoord;\n\tuv.y = 1.0 - uv.y;\n\n//BUCKETS\n\tvec4 c = texture(previousState, uv);\n\tvec4 curr = c;\n//POSITIONS\n\n//IDENTIFY\n\n//DEFAULTCOLOR\n\n//CODEBEGIN\n//RULES\n//CODEEND\n\n\tif(pause == 1.0){\n\t\tnext = c;\n\t}\n\n\tout_col = next;\n}\n';

    // parse instructions
    let text = code;

    let color_vec = {};
    colors.forEach(st => {
        color_vec[st.name] = translate_colors(st.color);
    });

    let insert = '';
    for(const [k, v] of Object.entries(color_vec)){
        insert += `const vec4 ${k} = ${v};\n`;
    }
    frag = frag.replace('//CONSTS', insert);

    insert = '';
    for(const k in color_vec){
        insert += `\tint ${k}_num = 0;\n`;
    }
    frag = frag.replace('//BUCKETS', insert);

    let nc = neighborhood === 'moore' ? ['tl', 't', 'tr', 'l', 'r', 'bl', 'b', 'br'] : ['t', 'l', 'r', 'b'];
    let ni = neighborhood === 'moore' ? [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]] : [[0, -1], [-1, 0], [1, 0], [0, 1]];
    insert = `\tvec4 n[${nc.length + (include_self ? 1 : 0)}];\n`;
    nc.forEach((c, idx) => {
        insert += `\tvec4 ${c} = textureOffset(previousState, uv, ivec2(${ni[idx][0]}, ${ni[idx][1]}));\n`;
    });
    nc = include_self ? ['c', ...nc] : nc;
    insert += `\tn = vec4[${nc.length}](`;
    nc.forEach((c, idx) => {
        insert += idx === nc.length-1 ? `${c});\n` : `${c}, `;
    });
    frag = frag.replace('//POSITIONS', insert);

    insert = `\tfor(int idx=0; idx<${nc.length}; idx++){\n`;
    for(const k in color_vec){
        insert += `\t\tif(eq(n[idx], ${k})){\n\t\t\t${k}_num++;\n\t\t}\n`;
    }
    insert += '\t}\n';
    frag = frag.replace('//IDENTIFY', insert);

    text = '\t' + text.replace(/\n/g, '\n\t');
    frag = frag.replace('//RULES', text);
    
    

    insert = `\tvec4 next = ${translate_colors(background)};`;
    frag = frag.replace('//DEFAULTCOLOR', insert);

    return frag;
}

/**
 * translate_colors is a function that takes an HTML color code and returns its vec4 representation
 *
 * @param {string} c - The input HTML color code
 *
 * @returns {string[]} - Index-encoded vec4 and packed uint representations, respectively.
 */
function translate_colors(c){
    const num = c.replace(/^#/, '0x');
    const tmp = parseInt(num);
    const r = ((tmp >> 16) & 0xFF) / 255.0;
    const g = ((tmp >> 8) & 0xFF) / 255.0;
    const b = (tmp & 0xFF) / 255.0;
    return `vec4(${r === 0 || r === 1 ? r.toFixed(1) : r}, ${g === 0 || g === 1 ? g.toFixed(1) : g}, ${b === 0 || b === 1 ? b.toFixed(1) : b}, 1.0)`;
}

export default langCompiler;
