package com.example.utils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class JsonUtils {
	private static final Gson GSON = new Gson();

	public static String getMessage(String msg) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("isSuccess", true);
		jsonObject.addProperty("message", msg);
		return GSON.toJson(jsonObject);
	}

	public static String getErrorMessage(String msg) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("isSuccess", false);
		jsonObject.addProperty("message", msg);
		return GSON.toJson(jsonObject);
	}

}
