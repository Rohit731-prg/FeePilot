from passlib.hash import pbkdf2_sha256

async def generatePassword(password: str) -> str:
    return pbkdf2_sha256.hash(password)

async def compairPassord(password: str, hashPassword: str) -> bool:
    return pbkdf2_sha256.verify(password, hashPassword)