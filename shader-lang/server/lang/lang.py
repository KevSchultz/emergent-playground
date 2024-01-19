#!/bin/python3

import re

def get_colors(hex):
    tmp = []
    for i in [0, 2, 4]:
        tmp.append(float(int(hex[i:i+2], 16)/255))
    out = 'vec4('
    for c in tmp:
        out += str(c) + ', '
    out += '1.0)'
    return out

def tokenize(rule):
    out = re.split(r'(\b(?:[<>]=?|==)\b|\b\w+\b)', rule)
    return [i.strip() for i in out if i.strip()]

if __name__ == '__main__':
    inst = ''
    with open('inst', 'r') as f:
        inst = f.read()
    f.close()
    inst = inst.splitlines()

    colors = {}
    for line in inst:
        if line == '':
            break
        tok = line.split(' ')
        colors[tok[0]] = get_colors(tok[2].lstrip('#'))

    inst = inst[len(colors)+1:len(inst)+1]

    frag = ''
    with open('lang_template.frag', 'r') as f:
        frag = f.read()
    f.close()

    insert = ''
    for c in colors.keys():
        insert += '\tuint ' + c + '_num = 0;\n'
    frag = frag.replace('//BUCKETS', insert)

    insert = ''
    for c, v in colors.items():
        insert += '\t' + c + ' = ' + v + ';\n'
    frag = frag.replace('//COLORS', insert)

    insert = '\t\t\tswitch(col){\n'
    for c in colors.keys():
        insert += '\t\t\t\tcase ' + c + ':\n\t\t\t\t\t' \
                + c + '_num++;\n\t\t\t\t\tbreak;\n'
    insert += '\t\t\t}'
    frag = frag.replace('//IDENTIFY', insert)

    insert = ''
    col = ''
    ineq = '<==>=!='
    for i in range(len(inst)):
        if inst[i][0] != '\t' and inst[i][0] != ' ':
            col = inst[i].rstrip('{')
        elif inst[i] == '}':
            continue
        else:
            insert += '\tif(' if inst[i-1][-1] == '{' else ''
            proc = tokenize(inst[i].lstrip('\t'))
            for tok in proc:
                if tok in colors.keys():
                    insert += f'{tok}_num'
                elif tok in ineq or tok.isdigit():
                    insert += tok
                elif tok == 'and':
                    insert += '&&'
            insert += ' || ' if inst[i+1] != '}' else '){\n\t\tcolor='+col+';\n\t}\n'
    frag = frag.replace('//RULES', insert)
                

    with open('lang.frag', 'w') as f:
        f.write(frag)
    f.close()
