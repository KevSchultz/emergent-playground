#!/bin/python3

import re

def split_inst(inst):
    line = inst.find('---')
    return inst[0:line], inst[line+4:len(inst)]

def translate_colors(c):
    vec = 'vec4('
    tmp = [float(int(c[i:i+2], 16))/255.0 for i in [0, 2, 4]]
    for i in tmp:
        vec += str(i) + ', '
    vec += '1.0)'
    code = f'0x{c}FF'
    return vec, code

if __name__ == '__main__':

    with open('lang_template.frag', 'r') as f:
        frag = f.read()
        f.close()

    with open('inst', 'r') as f:
        inst_full = f.read()
        f.close()

    data, text = split_inst(inst_full)
    del inst_full

    color_vec = {}
    color_int = {}
    for c in data.split('\n'):
        if c == '': continue
        tok = c.split(' ')
        color_vec[tok[0]], color_int[tok[0]] = translate_colors(tok[2][1:])
    
    insert = ''
    for k, v in color_vec.items():
        insert += f'const vec4 {k} = {v};\n'
    frag = frag.replace('//CONSTS', insert)

    insert = ''
    for k in color_vec.keys():
        insert += f'\tuint {k}_num = uint(0);\n'
    frag = frag.replace('//BUCKETS', insert)

    insert = '\t\t\tswitch(col){\n'
    for k, v in color_int.items():
        insert += f'\t\t\t\tcase uint({v}):\n\t\t\t\t\t{k}_num++;\n\t\t\t\t\tbreak;\n'
    insert += '\t\t\t}\n'
    frag = frag.replace('//IDENTIFY', insert)

    text = '\n'.join([f'\t{x}' for x in text.split('\n')])
    insert = re.sub(r'\b(\d+)\b', r'uint(\1)', text)#)
    frag = frag.replace('//RULES', insert)

    with open('lang.frag', 'w') as f:
        f.write(frag)
        f.close()
