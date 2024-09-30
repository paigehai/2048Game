pipeline {
    agent any

    tools {
        jdk 'jdk17'
        maven 'maven3'
        nodejs 'nodejs'
    }

    environment {
        PATH = "/usr/local/bin:${env.PATH}"
        SONAR_TOKEN = credentials('sonarqube-token')
        DOCKER_IMAGE_NAME = 'paigehai/2048game:latest'
        SONAR_URL = 'http://localhost:9000/'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "Fetching files..."
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/paigehai/2048Game'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'mvn clean package'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing application...'
                sh 'mvn test'
            }
        } 

        stage('Build & Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                        sh "docker build -t ${DOCKER_IMAGE_NAME} ."
                        sh "docker push ${DOCKER_IMAGE_NAME}"
                    }
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv() { 
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectName=2048Game \
                            -Dsonar.projectKey=2048Game \
                            -Dsonar.java.binaries=. \
                            -Dsonar.url=${SONAR_URL} \
                        """
                    }
                }
            }
        }

        stage('Deploy to Container') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                        sh "docker-compose up -d"
                    }
                }
            }
        }

        stage('Release to Production') {
            steps {
                echo 'Deploying to production using AWS CodeDeploy...'
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                echo 'Monitoring for anomolies using DataDog...'
            }
        }
    }
}
