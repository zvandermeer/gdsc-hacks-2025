from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization
import base64

# Generate a new private key
private_key = ec.generate_private_key(ec.SECP256R1())

# Export private key as PEM
private_pem = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption()
)

# Get raw public key in uncompressed form (bytes)
public_key = private_key.public_key()
public_bytes = public_key.public_bytes(
    encoding=serialization.Encoding.X962,
    format=serialization.PublicFormat.UncompressedPoint
)

# Base64-url encode the public key (as required by Push API)
public_key_b64url = base64.urlsafe_b64encode(public_bytes).decode('utf-8').rstrip('=')

# Base64-url encode private key for web-push
raw_private_numbers = private_key.private_numbers().private_value.to_bytes(32, 'big')
private_key_b64url = base64.urlsafe_b64encode(raw_private_numbers).decode('utf-8').rstrip('=')

print("Public VAPID key (use in frontend):", public_key_b64url)
print("Private VAPID key (use in server):", private_key_b64url)
