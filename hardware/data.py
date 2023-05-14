
"""new_data - JSON representation of data to encode
previous_data - Old data in the string format, used to pass to the next thing. If None, this is a leaf node.

Returns: If the ESP32 should panic (based on previous data)"""
def encode_worker(new_data, previous_data):
    previous_data_split = previous_data.split("\n")
    flag = previous_data[0]
    N = int(previous_data[1])


    lines = [len(data)]
    lines.append(f"{data[]}")

    return flag != "None"

def get_flag_worker(data):
    pass

def encode_master(data):
    pass

def decode_master(data):