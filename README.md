# chonk9k-whale-manager-deployment
Automated deployment pipeline for $CHONK9K Whale Manager. Integrates Docker, Helm, Kubernetes, and CI/CD pipelines for seamless scaling and zero-downtime updates of whale monitoring services on Solana. Includes optimized Helm charts, rolling updates, and automated deployment strategies.

Overview

The $CHONK9K Whale Manager is responsible for monitoring large wallet holders (whales) within the $CHONK9K token ecosystem. This system ensures that whale activity is tracked and alerts are triggered when necessary. The deployment leverages Kubernetes and Helm for efficient scaling, maintenance, and updates.

Features
	•	Dockerized Application: Containerized app for scalable deployment.
	•	Helm Chart: Helm templates to manage the Kubernetes resources.
	•	Zero-Downtime Deployments: Rolling updates using Kubernetes to ensure uninterrupted service during updates.
	•	CI/CD Pipeline Integration: Automated deployment using GitHub Actions to manage deployments seamlessly.

Getting Started

Prerequisites
	•	Kubernetes Cluster: A running Kubernetes cluster (local or cloud-based like AWS EKS, Google GKE, etc.).
	•	Helm 3: Install Helm for managing Kubernetes applications.
	•	Docker: Install Docker to build and push the container image.
	•	GitHub Account: For managing and updating the repository.

Setup
	1.	Clone this repository:

 git clone https://github.com/Boomchainlab/chonk9k-whale-manager-deployment.git
cd chonk9k-whale-manager-deployment

	2.	Update the values.yaml file to configure environment variables such as:
	•	RPC_URL: URL for Solana RPC service.
	•	MINT_ADDRESS: The mint address of the $CHONK9K token.
	•	WHALE_THRESHOLD: The whale balance threshold to trigger alerts.
	•	ALERT_WEBHOOK_URL: Webhook URL for receiving whale alerts.
	•	NEW_UPDATE_AUTHORITY: The new update authority for the $CHONK9K token.
	•	PAYER_KEYPAIR_PATH: Path to the payer's keypair file.
	3.	Build and push the Docker imag docker build -t your-docker-/chonkpump-manager:latest .
docker push your-docker-repository/chonkpump-manager:latest

	4.	Install the application with Helm:

 helm install chonkpump-manager ./chonkpump-manager

	5.	Remember to update the .env file with your specific values for the environment variables.

	6.	Verify the Docker image after pushing it:

		* Pull the Docker image:
		```sh
		docker pull your-docker-repository/chonkpump-manager:latest
		```
		Replace `your-docker-repository` with the actual name of your Docker repository.

		* Run the Docker container:
		```sh
		docker run -d --name chonkpump-manager chonkpump-manager/chonkpump-manager:latest
		```
		This will start a container named `chonkpump-manager` in detached mode.

		* Check container logs:
		```sh
		docker logs chonkpump-manager
		```

		* Clean up:
		```sh
		docker stop chonkpump-manager
		docker rm chonkpump-manager
		```

 CI/CD Pipeline

This repository is configured to automatically deploy updates when changes are pushed to the main branch. The pipeline includes:
	•	Linting
	•	Testing
	•	Docker Build & Push
	•	Helm Upgrade (Rolling Updates)

The CI/CD configuration is contained in .github/workflows/ci-cd.yaml.
Deployment Strategy

The deployment uses the RollingUpdate strategy for zero-downtime updates:
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
    This ensures that during upgrades, the new version is rolled out one pod at a time, with no downtime and no loss of service.

Monitoring and Alerts

The whale manager monitors wallets holding large amounts of $CHONK9K and triggers alerts when the set threshold is exceeded. The alerts are sent to the configured webhook URL for further action.

License

This project is licensed under the MIT License - see the LICENSE file for details.
