/**
 * @file langCompiler.js transforms instructions from EditorTabPanel to a fragment shader.
 * @author Beckett Avary
 * @project Emergent Playground
 */

// React Imports
import { useContext } from 'react';

// Other Imports
import P5PropertiesContext from '../components/P5PropertiesContext';

/**
 * langCompiler is a function that takes a String instruction of shader-lang format and transforms it to GLSL ES 3.0 code.
 *
 * @param {string} inst - The input instruction code.
 * @param {boolean} include_self - Whether to include current cell in identificaiton.
 * @param {number} range - Integer size of neighborhood in identification.
 * @param {string} neighborhood - Type of neighborhood. TODO: Encode customs somehow.
 * @param {Array[{string, string}]} colors - ONLY USE langTupleList here!!!
 *
 * @returns {string} frag - The resultant GLSL ES 3.0 code.
 */
function langCompiler(code, colors, include_self, range, neighborhood){
    let frag = '#version 300 es\n\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nin vec2 vTexCoord;\nout vec4 out_col;\n\nuniform sampler2D tex;\nuniform vec2 normalRes;\nuniform float pause;\n\n//CONSTS\n\nuint pack(vec4 v){\n\tuint o = uint(0x0);\n\to |= uint(round(clamp(v.r, 0.0, 1.0) * 255.0)) << 24;\n\to |= uint(round(clamp(v.g, 0.0, 1.0) * 255.0)) << 16;\n\to |= uint(round(clamp(v.b, 0.0, 1.0) * 255.0)) << 8;\n\to |= uint(round(clamp(v.a, 0.0, 1.0) * 255.0));\n\treturn o;\n}\n\nvoid main(){\n\tvec2 uv = vTexCoord;\n\tuv.y = 1.0 - uv.y;\n\n//BUCKETS\n\n\tvec4 curr = texture(tex, uv);\n\n\tuint col;\n//RANGE\n//INCLUDE_SELF\n//NEIGHBORHOOD\n\t\t\tfloat x = uv.x + i * normalRes.x;\n\t\t\tfloat y = uv.y + j * normalRes.y;\n\n\t\t\tcol = pack(texture(tex, vec2(x, y)));\n\n//IDENTIFY\n\n\t\t}\n\t}\n\n\tvec4 cell;\n\n//RULES\n\n\tif(pause == 1.0){\n\t\tcell = curr;\n\t}\n\n\tout_col = cell;\n}\n';

    // parse instructions
    let text = code;

    let color_vec = {};
    let color_int = {};
    colors.forEach(st => {
        [color_vec[st.name], color_int[st.name]] = translate_colors(st.color);
    });

    let insert = '';
    for(const [k, v] of Object.entries(color_vec)){
        insert += `const vec4 ${k} = ${v};\n`;
    }
    frag = frag.replace('//CONSTS', insert);

    insert = '';
    for(const k in color_vec){
        insert += `\tuint ${k}_num = uint(0);\n`;
    }
    frag = frag.replace('//BUCKETS', insert);

    insert = '\t\t\tswitch(col){\n';
    for(const [k, v] of Object.entries(color_int)){
        insert += `\t\t\t\tcase uint(${v}):\n\t\t\t\t\t${k}_num++;\n\t\t\t\t\tbreak;\n`;
    }
    insert += '\t\t\t}\n';
    frag = frag.replace('//IDENTIFY', insert);

    text = '\t' + text.replace(/\n/g, '\n\t');
    insert = text.replace(/\b(\d+)\b/g, match => {
        return `uint(${match})`;
    });
    frag = frag.replace('//RULES', insert);

    //parse options
    insert = `\tfor(float i = -${range}.0; i < ${range+1}.0; i++){\n\t\tfor(float j = -${range}.0; j < ${range+1}.0; j++){\n`;
    frag = frag.replace('//RANGE', insert);

    if(!include_self){
        insert = '\t\t\tif(i==0.0 && j==0.0){\n\t\t\t\tcontinue;\n\t\t\t}\n';
        frag = frag.replace('//INCLUDE_SELF', insert);
    } else {
        frag = frag.replace('//INCLUDE_SELF', '');
    }


    if(neighborhood === 'von_neumann'){
        insert = `\t\t\tif(!(abs(i)+abs(j)<=${range}.0)){\n\t\t\t\tcontinue;\n\t\t\t}\n`;
        frag = frag.replace('//NEIGHBORHOOD', insert);
    } else if(neighborhood === 'moore'){
        frag = frag.replace('//NEIGHBORHOOD', '');
    } else{
        frag = frag.replace('//NEIGHBORHOOD', '');
    }

    return frag;
}

/**
 * translate_colors is a function that takes an HTML color code and returns its vec4 and uint packed representations
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
    return [`vec4(${r.toFixed(4)}, ${g.toFixed(4)}, ${b.toFixed(4)}, 1.0)`, num + 'FF'];
}

export default langCompiler;
