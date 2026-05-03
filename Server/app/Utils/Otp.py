import random as rd

def generateOTP() -> str:
    return str(rd.randint(1111, 9999))