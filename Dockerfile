FROM floryn90/hugo:0.123.8-ubuntu-onbuild as build
WORKDIR /src
COPY . .

FROM nginx:alpine
COPY --from=build /target /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
