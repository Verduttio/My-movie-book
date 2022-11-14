FROM openjdk:17-jdk-alpine
VOLUME /tmp
COPY build/libs/*SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Dspring.profiles.active=dev","-jar","/app.jar"]
EXPOSE 8080