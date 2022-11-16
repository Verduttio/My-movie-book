FROM openjdk:17-jdk-alpine
VOLUME /tmp
COPY build/libs/*SNAPSHOT.jar app.jar

ARG DATABASE_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD

#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dserver.port=$PORT", "-Dspring.profiles.active=dev","-jar","/app.jar"]
CMD java -Djava.security.egd=file:/dev/./urandom -Dserver.port=$PORT -Dspring.profiles.active=dev -Dspring.datasource.url=$DATABASE_URL -Dspring.datasource.username=$DATABASE_USERNAME -Dspring.datasource.password=$DATABASE_PASSWORD -jar /app.jar