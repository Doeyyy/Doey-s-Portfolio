import os

# --- CONFIGURATION ---
OUTPUT_FILE = "full_frontend_code.txt"

# File extensions to include
INCLUDED_EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx', '.css', '.module.css', '.json'}

# Directories to strictly ignore
IGNORED_DIRS = {'node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.vscode'}

# Specific files to ignore (optional)
IGNORED_FILES = {'package-lock.json', 'yarn.lock'}

def merge_files():
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
        # Walk through the current directory
        for root, dirs, files in os.walk("."):
            # Modify 'dirs' in-place to skip ignored directories
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
            
            for file in files:
                if file in IGNORED_FILES:
                    continue

                # Check extension
                _, ext = os.path.splitext(file)
                if ext in INCLUDED_EXTENSIONS:
                    file_path = os.path.join(root, file)
                    
                    print(f"Processing: {file_path}")
                    
                    # Write separator and filename
                    outfile.write(f"\n{'='*50}\n")
                    outfile.write(f"FILE: {file_path}\n")
                    outfile.write(f"{'='*50}\n\n")
                    
                    # Write content
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as infile:
                            outfile.write(infile.read())
                    except Exception as e:
                        outfile.write(f"Error reading file: {e}\n")

    print(f"\nDone! All code merged into: {OUTPUT_FILE}")

if __name__ == "__main__":
    merge_files()