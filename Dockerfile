FROM ruphin/webserve

COPY ./demo /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
COPY ./node_modules/@webcomponents/webcomponentsjs /usr/share/nginx/html/node_modules/@webcomponents/webcomponentsjs
COPY ./node_modules/@babel/polyfill /usr/share/nginx/html/node_modules/@babel/polyfill
