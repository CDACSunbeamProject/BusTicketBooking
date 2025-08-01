package com.project.models;

enum AppStatus {
	success, error
}

public class MyException<T> {
	private AppStatus status;
	private T data;
	private String message;
	
	public MyException(AppStatus status, T data, String message) {
		this.status = status;
		this.data = data;
		this.message = message;
	}
	
	public AppStatus getStatus() {
		return status;
	}


	public T getData() {
		return data;
	}


	public String getMessage() {
		return message;
	}


	public static <T> MyException<T> success(T data) {
		MyException<T> res = new MyException<T>(AppStatus.success, data, null);
		return res;
	}
	public static <T> MyException<T> success(T data, String message) {
		MyException<T> res = new MyException<T>(AppStatus.success, data, message);
		return res;
	}
	public static <T> MyException<T> error(String message) {
		MyException<T> res = new MyException<T>(AppStatus.error, null, message);
		return res;
	}
}
