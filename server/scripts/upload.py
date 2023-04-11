from server.hub.spaces import client
from decouple import config


# List all buckets on your account
bucket_name = config("SPACES_BUCKET")
response = client.list_buckets()
spaces = [space["Name"] for space in response["Buckets"]]
print("Spaces List: %s" % spaces)

bucket_objs = client.list_objects(Bucket=bucket_name)["Contents"]
for obj in bucket_objs:
    print(obj)
