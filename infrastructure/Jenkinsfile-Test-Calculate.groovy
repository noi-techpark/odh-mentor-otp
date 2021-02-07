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
        GBFS_HOST = "https://gbfs.otp.opendatahub.testingmachine.eu"
        GBFS_PORT = "443"
        UPDATERS = "True"
        GTFS_FILE = "latestGTFS.zip"
        OFFICIAL="False"
        GBFS_VERSION=1
        GTFS_RT_URL="https://efa.sta.bz.it/gtfs-r/"
        GTFS_FEED_ID=1
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
                    echo 'UPDATERS=${UPDATERS}' >> .env
                    echo 'GBFS_HOST=${GBFS_HOST}' >> .env
                    echo 'GBFS_PORT="${GBFS_PORT}"' >> .env
                    echo 'OFFICIAL="${OFFICIAL}"' >> .env
                    echo 'GBFS_VERSION="${GBFS_VERSION}"' >> .env
                    echo 'GTFS_RT_URL="${GTFS_RT_URL}"' >> .env
                    echo 'GTFS_FEED_ID="${GTFS_FEED_ID}"' >> .env
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
    }
}
