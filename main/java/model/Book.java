package model;

import java.util.Objects;

public class Book {
	private String title;
	private String author;
	private String genre;
	private String description;
	
	public Book() {
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		if(author.equals("")) {
			this.author = "N/A";
		}else {
			this.author = author;
		}
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		if(author.equals("")) {
			this.genre = "N/A";
		}else {
			this.genre = genre;
		}
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		if(author.equals("")) {
			this.description = "N/A";
		}else {
			this.description = description;
		}
	}

	@Override
	public int hashCode() {
		return Objects.hash(author, description, genre, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		return Objects.equals(author, other.author) && Objects.equals(description, other.description)
				&& Objects.equals(genre, other.genre) && Objects.equals(title, other.title);
	}
	
	
}
