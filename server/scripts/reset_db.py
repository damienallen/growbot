from server.hub.influx import CAPTURES_BUCKET, client, delete_api, org_name


def run():
    """
    Delete Data
    """
    start = "1900-01-01T00:00:00Z"
    stop = "2050-01-01T00:00:00Z"
    delete_api.delete(
        start, stop, '_measurement="photo"', bucket=CAPTURES_BUCKET, org=org_name
    )

    client.close()


if __name__ == "main":
    run()
