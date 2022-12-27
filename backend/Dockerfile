FROM openjdk:17-jdk-alpine
VOLUME /tmp
COPY build/libs/*SNAPSHOT.jar app.jar

ARG DATABASE_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD

ENV SPRING_DATASOURCE_URL $DATABASE_URL
ENV SPRING_DATASOURCE_USERNAME $DATABASE_USERNAME
ENV SPRING_DATASOURCE_PASSWORD $DATABASE_PASSWORD

#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dserver.port=$PORT", "-Dspring.profiles.active=prod","-jar","/app.jar"]
CMD java -Djava.security.egd=file:/dev/./urandom -Dserver.port=$PORT -Dspring.profiles.active=prod -jar /app.jar