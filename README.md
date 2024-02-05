# kmh 프로젝트

## 프로젝트 설명
- 채널별로 분류된 커뮤니티 토이 프로젝트
- 리액트, 스프링 기반 프로젝트

## 환경설정

### 사전 설치
1. cd src/main/frontend
2. npm install

### 리액트 실행 방법:
1. cd src/main/frontend
2. npm start

### application.properties 설정방법
  #DB Configuration
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
  spring.datasource.url=jdbc:mysql://db위치
  spring.datasource.username=
  spring.datasource.password=
  
  #spring JPA
  spring.jpa.show-sql=true
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.properties.hibernate.format_sql=true
  logging.level.org.springframework.security=DEBUG
  
  spring.security.user.name=
  spring.security.user.password=
  
  #ssh ?? ? ????
  ssh.host=
  ssh.port=
  ssh.user=
  ssh.password=
  ssh.remoteDirectory=
  
  #Spring Port(frontend(react) -> 3000)
  server.port = 8080
  
  #log level
  logging.level.root=INFO
  #JWT Configuration
  jwt.secret=jwt base64 인코딩 된 암호 입력
