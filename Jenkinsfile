pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('Build Java') {
            parallel {
                stage('Build ApiGateway') {
                    steps {
                        dir('ApiGateway') {
                            sh './gradlew build -x test'
                        }
                    }
                }
                stage('Build Demo') {
                    steps {
                        dir('demo') {
                            sh './mvnw package -DskipTests'
                        }
                    }
                }
            }
        }

        stage('Test Java') {
            parallel {
                stage('Test ApiGateway') {
                    steps {
                        dir('ApiGateway') {
                            sh './gradlew test jacocoTestReport jacocoTestCoverageVerification'
                        }
                    }
                    post {
                        always {
                            junit 'ApiGateway/build/test-results/**/*.xml'
                        }
                    }
                }
                stage('Test Demo') {
                    steps {
                        dir('demo') {
                            sh './mvnw test jacoco:report jacoco:check'
                        }
                    }
                    post {
                        always {
                            junit 'demo/target/surefire-reports/**/*.xml'
                        }
                    }
                }
            }
        }

        stage('Build & Test Python') {
            parallel {
                stage('alugueis-service') {
                    steps {
                        dir('alugueis-service') {
                            sh '''
                                pip install -r requirements.txt
                                pip install pytest pytest-cov flake8
                                flake8 app/ --count --select=E,F --show-source --statistics
                                pytest --junitxml=report.xml --cov=app --cov-report=xml:coverage.xml --cov-fail-under=70
                            '''
                        }
                    }
                    post {
                        always {
                            junit 'alugueis-service/report.xml'
                        }
                    }
                }
                stage('filmes-service') {
                    steps {
                        dir('filmes-service') {
                            sh '''
                                pip install -r requirements.txt
                                pip install pytest pytest-cov flake8
                                flake8 app/ --count --select=E,F --show-source --statistics
                                pytest --junitxml=report.xml --cov=app --cov-report=xml:coverage.xml --cov-fail-under=70
                            '''
                        }
                    }
                    post {
                        always {
                            junit 'filmes-service/report.xml'
                        }
                    }
                }
                stage('user-service') {
                    steps {
                        dir('user-service') {
                            sh '''
                                pip install -r requirements.txt
                                pip install pytest pytest-cov flake8
                                flake8 app/ --count --select=E,F --show-source --statistics
                                pytest --junitxml=report.xml --cov=app --cov-report=xml:coverage.xml --cov-fail-under=70
                            '''
                        }
                    }
                    post {
                        always {
                            junit 'user-service/report.xml'
                        }
                    }
                }
                stage('payment-service') {
                    steps {
                        dir('payment-service') {
                            sh '''
                                if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
                                pip install pytest pytest-cov flake8
                                flake8 app/ --count --select=E,F --show-source --statistics
                                pytest --junitxml=report.xml --cov=app --cov-report=xml:coverage.xml --cov-fail-under=70
                            '''
                        }
                    }
                    post {
                        always {
                            junit 'payment-service/report.xml'
                        }
                    }
                }
            }
        }

        stage('Build Angular') {
            steps {
                dir('frontend/looker') {
                    sh 'npm ci && npm run lint && npm run build -- --configuration production'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Docker Build') {
            parallel {
                stage('Docker: ApiGateway') {
                    steps {
                        sh 'docker build -t looker/api-gateway:${GIT_COMMIT} ApiGateway/'
                    }
                }
                stage('Docker: Demo') {
                    steps {
                        sh 'docker build -t looker/demo:${GIT_COMMIT} demo/'
                    }
                }
                stage('Docker: alugueis-service') {
                    steps {
                        sh 'docker build -t looker/alugueis-service:${GIT_COMMIT} alugueis-service/'
                    }
                }
                stage('Docker: filmes-service') {
                    steps {
                        sh 'docker build -t looker/filmes-service:${GIT_COMMIT} filmes-service/'
                    }
                }
                stage('Docker: user-service') {
                    steps {
                        sh 'docker build -t looker/user-service:${GIT_COMMIT} user-service/'
                    }
                }
                stage('Docker: payment-service') {
                    steps {
                        sh 'docker build -t looker/payment-service:${GIT_COMMIT} payment-service/'
                    }
                }
                stage('Docker: Frontend') {
                    steps {
                        sh 'docker build -t looker/frontend:${GIT_COMMIT} frontend/looker/'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}
