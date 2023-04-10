from server.hub.spaces import client
import os


# List all buckets on your account
print(os.environ.get("SPACES_KEY"))
response = client.list_buckets()
spaces = [space["Name"] for space in response["Buckets"]]
print("Spaces List: %s" % spaces)
 