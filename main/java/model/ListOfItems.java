package model;

import java.util.List;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;

public class ListOfItems {
	private static final List<String> words = new ArrayList<>(List.of("These", "precels", "are", "making", "me", "thirsty"));

	public static List<String> getWords() {
		return Collections.unmodifiableList(words);
	}
	public static void listWords(PrintWriter writer){
		System.out.println("bingo");
		List<String> tempList = Collections.unmodifiableList(words);
		for(String word : tempList) {
			writer.println("<li>%s</li>".formatted(word));
		}
	}

	
}
