
# create cluster without nodegroup
eksctl create cluster --name=jobberapp \
    --region=eu-north-1 \
    --vpc-private-subnets=subnet-0c2c9c080712b2529,subnet-0722711d3cba87e13 \
    --without-nodegroup

# Associate IAM OIDC
eksctl utils associate-iam-oidc-provider \
    --region=eu-north-1 \
    --cluster=jobberapp \
    --approve

# Create EKS nodegroup with private subnets
eksctl create nodegroup --cluster=jobberapp \
    --region=eu-north-1 \
    --name=jobberapp-node \
    --subnet-ids=subnet-0c2c9c080712b2529,subnet-0722711d3cba87e13 \
    --node-type=t3.micro \
    --nodes=4 \
    --nodes-min=4 \
    --nodes-max=6 \
    --node-volume-size=20 \
    --ssh-access \
    --ssh-public-key=jobber-kube \
    --managed \
    --asg-access \
    --external-dns-access \
    --full-ecr-access \
    --appmesh-access \
    --alb-ingress-access \
    --node-private-networking

# Delete eks cluster
# eksctl delete cluster <cluster-name> --region=<your-region>

# Other resources to delete
# - natgateway
# - elasticip
# - mysql instance
# - postgres instance