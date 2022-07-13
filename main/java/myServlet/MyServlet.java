package myServlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.DBClient;
import model.Book;

import java.io.IOException;
import java.io.PrintWriter;

import org.apache.jasper.compiler.NewlineReductionServletWriter;
import org.bson.Document;
import org.bson.types.ObjectId;

@WebServlet("/my-web-app")
public class MyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter writer = response.getWriter();
		String id = request.getParameter("id");
		if(id != null) { 
			DBClient.getSingleEntryFromDB(writer, id);
		}else {
			DBClient.getAllEntriesFromDB(writer);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String title = request.getParameter("title");
		String author = request.getParameter("author");
		String genre = request.getParameter("genre");
		String description = request.getParameter("description");
		DBClient.postToDB(title, author, genre, description);
		response.sendRedirect("/mywebapp");
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String idString = request.getParameter("id");
		DBClient.deleteFromDB(idString);
	}
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
}
