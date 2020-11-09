pipeline {
    agent any

    environment {
        DOCKER_PROJECT_NAME = "odh-mentor-otp"
        DOCKER_IMAGE_OTP = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-calculate-otp'
        DOCKER_TAG = "test-$BUILD_NUMBER"

        JAVA_MX = "8G"
        BUILD_GRAPH = "True"
        DOWNLOAD_DATA = "False"
        BACKUP_GRAPH = "True"
        GTFS_FILE = "200804_ExportGTFS.zip"
    }

    stages {
        stage('Configure') {
            steps {
                sh """
                    rm -f .env
                    cp .env.example .env
                    echo 'COMPOSE_PROJECT_NAME=${DOCKER_PROJECT_NAME}' > .env
                    echo 'DOCKER_IMAGE_OTP=${DOCKER_IMAGE_OTP}' >> .env
                    echo 'DOCKER_TAG=${DOCKER_TAG}' >> .env

                    echo 'JAVA_MX=${JAVA_MX}' >> .env
                    echo 'BUILD_GRAPH=${BUILD_GRAPH}' >> .env
                    echo 'DOWNLOAD_DATA=${DOWNLOAD_DATA}' >> .env
                    echo 'BACKUP_GRAPH=${BACKUP_GRAPH}' >> .env
                    echo 'GTFS_FILE=${GTFS_FILE}' >> .env
                """
            }
        }
        stage('Build') {
            steps {
                sh '''
                    aws ecr get-login --region eu-west-1 --no-include-email | bash
                    docker-compose --no-ansi -f infrastructure/docker-compose.build.calculate.yml build --pull
                    docker-compose --no-ansi -f infrastructure/docker-compose.build.calculate.yml push
                '''
            }
        }
        stage('Deploy') {
            steps {
               sshagent(['jenkins-ssh-key']) {
                    sh """
                        (cd infrastructure/ansible && ansible-galaxy install -f -r requirements.yml)
                        (cd infrastructure/ansible && ansible-playbook --limit=test deploy.calculate.yml --extra-vars "release_name=${BUILD_NUMBER}")
                    """
                }
            }
        }
        stage('Reload new graph into memory of live instance'){
            steps{
                sh '''curl -i -X PUT -H 'Content-Type:applicaton/json' "https://otp.opendatahub.testingmachine.eu/otp/routers/openmove"'''
            }
        }
    }
}
