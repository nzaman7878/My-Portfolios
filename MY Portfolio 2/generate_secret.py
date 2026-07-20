import secrets

env_path = 'c:/Users/nuruz/Desktop/My Portfolios/MY Portfolio 2/.env'
secret = secrets.token_hex(32)

with open(env_path, 'a', encoding='utf-8') as f:
    f.write(f'\nADMIN_JWT_SECRET="{secret}"\n')

print('Appended strong secret to .env')
