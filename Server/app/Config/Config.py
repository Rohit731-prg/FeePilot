from pydantic_settings import BaseSettings, SettingsConfigDict

class Setting(BaseSettings):
    DB_PASSWORD: str = ""
    JWT_SCERET_KEY: str = ""

    model_config = SettingsConfigDict(env_file=".env")

setting = Setting()