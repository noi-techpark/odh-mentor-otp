pipeline {
    agent any

    environment {
        INSTANCE_ID='i-074030d2b6e40243d'
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    }

    stages {
        stage('Start Server') {
            steps {
                sh 'aws ec2 start-instances --instance-ids ${INSTANCE_ID}'
            }
        }
        stage('Wait for server to start') {
            steps {
                sh 'aws ec2 wait instance-running --instance-ids ${INSTANCE_ID}'
                sh 'sleep 120'
            }
        }
        stage('Start Calc Pipeline') {
            steps{
                build job: 'calculate.prod-deploy', wait:true
            }
        }       
    }
    
     post {
        always {
            sh 'aws ec2 stop-instances --instance-ids ${INSTANCE_ID}'
        }
    }
}
