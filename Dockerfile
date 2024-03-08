FROM floryn90/hugo:0.123.8-ubuntu-onbuild as build
WORKDIR /app
COPY . .
RUN hugo

FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
