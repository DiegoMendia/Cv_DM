# Usa una imagen base de Java
FROM openjdk:17-jdk-slim

#Quien es el dueño
MAINTAINER DM

# Copia el archivo JAR al contenedor
COPY target/send_mail-0.0.1-SNAPSHOT.jar  dm-app.jar

# Especifica el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/dm-app.jar"]