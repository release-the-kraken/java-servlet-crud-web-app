package model;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static model.Constants.*;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.jasper.compiler.NewlineReductionServletWriter;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.types.ObjectId;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

public class DBClient {
	private static CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
	private static CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(),
			fromProviders(pojoCodecProvider));
	private static ConnectionString connectionString = new ConnectionString(MONGO_URL);
	private static MongoClientSettings clientSettings = MongoClientSettings.builder()
			.applyConnectionString(connectionString).codecRegistry(pojoCodecRegistry).build();

	public static void getAllEntriesFromDB(PrintWriter writer) {
		try (MongoClient mongoClient = MongoClients.create(clientSettings)) {
			MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
			MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);
			String output = collection.find()
				.map(doc -> doc.toJson())
				.into(new ArrayList<>())
				.stream()
				.collect(Collectors.joining(", ", "[", "]"));
			System.out.println("Successfully obtained data:");
			System.out.println(output);
			writer.write(output);	
			writer.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	public static void getSingleEntryFromDB(PrintWriter writer, String id) {
		try (MongoClient mongoClient = MongoClients.create(clientSettings)){
			MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
			MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);
			FindIterable<Document> documents = collection.find(eq("_id", new ObjectId(id)));
			String output = documents.first().toJson();
			System.out.println("Succesfully obtained entry:");
			System.out.println(output);
			writer.write(output);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	public static void postToDB(String title, String author, String genre, String description) {
		try (MongoClient mongoClient = MongoClients.create(clientSettings)) {
			MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
			MongoCollection<Book> collection = database.getCollection(COLLECTION_NAME, Book.class);
			Book book = new Book();
			book.setTitle(title);
			book.setAuthor(author);
			book.setGenre(genre);
			book.setDescription(description);
			collection.insertOne(book);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	public static void deleteFromDB(String id) {
		try (MongoClient mongoClient = MongoClients.create(clientSettings)) {
			MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
			MongoCollection<Book> collection = database.getCollection(COLLECTION_NAME, Book.class);
			collection.deleteOne(Filters.eq("_id", new ObjectId(id)));
			System.out.println("Item with id: " + id + " deleted succesfully");
			} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	public static void putToBD(String firstName, String lastName) {
		
	}
}
