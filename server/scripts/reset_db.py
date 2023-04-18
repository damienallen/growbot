from server.hub.influx import client, delete_api, bucket_name, org_name


def run():
    """
    Delete Data
    """
    start = "2020-01-01T00:00:00Z"
    stop = "2025-01-01T00:00:00Z"
    delete_api.delete(
        start, stop, '_measurement="photo"', bucket=bucket_name, org=org_name
    )

    client.close()


if __name__ == "main":
    run()
