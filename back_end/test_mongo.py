from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.ai_healthcare
print(db.list_collection_names())
