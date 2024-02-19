#!/bin/bash

cat langTemplate.frag | tr '\n' '\\' | sed 's/\\/\\n/g' | sed 's/\t/\\t/g' | sed 's/    /\\t/g' > out

echo 'langTemplateToString.sh: wrote template string to out'
