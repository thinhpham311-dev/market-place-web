type JSONValue = string | number | boolean | null | JSONArray | JSONObject;
interface JSONObject {
  [key: string]: JSONValue;
}
type JSONArray = JSONValue[];

const isNumString = (str: string): boolean => !isNaN(Number(str));

function deepParseJson<T = JSONValue>(jsonString: unknown): T {
  if (typeof jsonString === "string") {
    if (isNumString(jsonString)) {
      return jsonString as unknown as T; // If it's a numeric string, return it directly.
    }
    try {
      // Try parsing the string into JSON
      const parsed = JSON.parse(jsonString);
      return deepParseJson<T>(parsed); // Recursively parse the result
    } catch {
      // If parsing fails, return the original string
      return jsonString as unknown as T;
    }
  } else if (Array.isArray(jsonString)) {
    // Recursively parse array elements
    return jsonString.map((val) => deepParseJson(val)) as unknown as T;
  } else if (typeof jsonString === "object" && jsonString !== null) {
    // Recursively parse object properties
    const parsedObject: JSONObject = Object.keys(jsonString).reduce((obj, key) => {
      const val = (jsonString as Record<string, unknown>)[key];
      (obj as Record<string, JSONValue>)[key] = isNumString(String(val))
        ? (val as JSONValue)
        : deepParseJson(val);
      return obj;
    }, {} as JSONObject);
    return parsedObject as unknown as T;
  } else {
    // Return other types (null, number, boolean) as is
    return jsonString as T;
  }
}

export default deepParseJson;
