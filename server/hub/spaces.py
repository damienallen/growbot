import boto3
from botocore.client import Config
from decouple import config

"""
Initialize a session using DigitalOcean Spaces
"""
session = boto3.session.Session()
client = session.client(
    "s3",
    region_name="ams3",
    endpoint_url="https://ams3.digitaloceanspaces.com",
    config=Config(s3={"addressing_style": "virtual"}),
    aws_access_key_id=config("SPACES_KEY"),
    aws_secret_access_key=config("SPACES_SECRET"),
)
