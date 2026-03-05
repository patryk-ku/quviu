use ffmpeg_sidecar::ffprobe::ffprobe_path;
use serde_json::Value;
use std::path::Path;
use std::process::Command;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_file(path: String) -> Result<Value, String> {
    let path = Path::new(&path);

    if !path.exists() {
        return Err("File does not exist".into());
    }

    let ffprobe = ffprobe_path();

    let output = Command::new(ffprobe)
        .args(&[
            "-v",
            "quiet",
            "-print_format",
            "json",
            "-show_format",
            "-show_streams",
            path.to_str().ok_or("Invalid path")?,
        ])
        .output()
        .map_err(|e| e.to_string())?;

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    let json: Value = serde_json::from_slice(&output.stdout).map_err(|e| e.to_string())?;

    Ok(json)
}

#[tauri::command]
fn start() -> Result<String, String> {
    Ok(String::from("test"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, open_file, start])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
