import os
import argparse

# --- Configuration ---

# Map file extensions to Markdown language identifiers
# Add or remove mappings as needed for your project
EXTENSION_TO_LANGUAGE = {
    # === Core Programming Languages ===
    '.py': 'python',
    '.js': 'javascript',    # JavaScript
    '.ts': 'typescript',    # TypeScript
    '.java': 'java',
    '.kt': 'kotlin',
    '.cs': 'csharp',        # C#
    '.c': 'c',
    '.h': 'c',              # C/C++ Header
    '.cpp': 'cpp',          # C++
    '.cc': 'cpp',           # C++
    '.hpp': 'cpp',          # C++ Header
    '.go': 'go',            # GoLang
    '.rs': 'rust',
    '.rb': 'ruby',
    '.php': 'php',
    '.swift': 'swift',
    '.sql': 'sql',          # SQL Database Queries
    '.pl': 'perl',          # Perl
    '.pm': 'perl',          # Perl Module

    # === Web Frontend: Markup & Styling ===
    '.html': 'html',
    '.htm': 'html',         # Older HTML extension
    '.css': 'css',          # Cascading Style Sheets
    '.scss': 'scss',        # Sassy CSS (SCSS syntax)
    '.sass': 'sass',        # Sass (Indented syntax)
    '.less': 'less',        # Less CSS preprocessor
    '.styl': 'stylus',      # Stylus CSS preprocessor
    # '.svg': 'svg',          # Scalable Vector Graphics (XML-based)

    # === Web Frontend: JavaScript/TypeScript Frameworks & Extensions ===
    '.jsx': 'jsx',          # JavaScript XML (Used heavily by React)
    '.tsx': 'tsx',          # TypeScript XML (Used heavily by React with TypeScript)
    '.vue': 'vue',          # Vue.js Single File Components
    '.svelte': 'svelte',      # Svelte components
    '.astro': 'astro',        # Astro framework files

    # === Web Frontend: HTML Templating Engines ===
    '.hbs': 'handlebars',   # Handlebars templates
    '.pug': 'pug',          # Pug templates (formerly Jade)
    '.ejs': 'ejs',          # Embedded JavaScript templates
    '.mustache': 'mustache',# Mustache templates
    '.liquid': 'liquid',    # Liquid templates (Shopify, Jekyll)

    # === Configuration & Data Formats ===
    '.json': 'json',        # JavaScript Object Notation
    '.yaml': 'yaml',
    '.yml': 'yaml',         # YAML Ain't Markup Language
    '.xml': 'xml',          # Extensible Markup Language
    '.toml': 'toml',        # Tom's Obvious, Minimal Language (often for config)
    '.env': 'dotenv',       # Environment variable files (e.g., .env, .env.local)
    '.ini': 'ini',          # Initialization files
    '.cfg': 'ini',          # Configuration files (often INI format)
    '.conf': 'properties',  # Configuration files (can vary, sometimes like Java properties)
    '.properties': 'properties', # Java properties files

    # === Build Tools & Project Configuration ===
    'package.json': 'json', # Node.js project manifest (specific filename)
    'tsconfig.json': 'json',# TypeScript configuration (specific filename)
    'jsconfig.json': 'json',# JavaScript configuration (specific filename)
    '.babelrc': 'json',     # Babel config (can also be .js, .cjs, .mjs)
    'babel.config.js': 'javascript', # Babel config
    'webpack.config.js': 'javascript', # Webpack config
    'vite.config.js': 'javascript', # Vite config
    'vite.config.ts': 'typescript', # Vite config (TypeScript)
    'postcss.config.js': 'javascript', # PostCSS config
    'tailwind.config.js': 'javascript', # Tailwind CSS config
    'tailwind.config.ts': 'typescript', # Tailwind CSS config (TypeScript)
    '.eslintrc.js': 'javascript', # ESLint config
    '.eslintrc.json': 'json', # ESLint config
    '.eslintrc.yaml': 'yaml', # ESLint config
    '.prettierrc': 'json',  # Prettier config (can be many formats)
    '.prettierrc.js': 'javascript', # Prettier config
    'Dockerfile': 'dockerfile', # Docker configuration (specific filename, no dot)
    '.dockerignore': 'dockerignore', # Docker ignore file

    # === Shell & Scripting ===
    '.sh': 'bash',          # Bourne Again Shell script
    '.bash': 'bash',
    '.zsh': 'zsh',          # Z Shell script
    '.fish': 'fish',        # Fish Shell script
    '.ps1': 'powershell',   # PowerShell script
    '.bat': 'bat',          # Windows Batch script
    '.cmd': 'bat',          # Windows Batch script (alternative)

    # === Documentation & Text ===
    '.md': 'markdown',      # Markdown
    '.rst': 'restructuredtext', # reStructuredText
    '.txt': 'text',         # Plain text
    '.log': 'log',          # Log files (often plain text)

    # === Other Web Related ===
    '.graphql': 'graphql',    # GraphQL query language
    '.gql': 'graphql',      # GraphQL query language (alternative ext)
    '.wasm': 'wasm',        # WebAssembly (binary, but extension is relevant)
    '.wat': 'wat',          # WebAssembly Text Format
    '.gitignore': 'gitignore', # Git ignore file

    # Add more mappings here as needed
}


# --- Argument Parsing ---
parser = argparse.ArgumentParser(description="Combine codebase files into a single Markdown file.")
parser.add_argument("root_dir", help="The root directory of the codebase to scan.")
parser.add_argument("output_file", help="The path for the output Markdown file.")
parser.add_argument("-e", "--extensions", nargs='+', default=list(EXTENSION_TO_LANGUAGE.keys()),
                    help="List of file extensions to include (e.g., .py .js .html). Default includes all mapped extensions.")
parser.add_argument("-i", "--ignore-dirs", nargs='+', default=['.git', '.vscode', 'node_modules', '__pycache__', 'build', 'dist', 'target', 'venv', '.venv'],
                    help="List of directory names to ignore.")
parser.add_argument("-f", "--ignore-files", nargs='+', default=['.DS_Store', 'package-lock.json'],
                    help="List of specific file names to ignore.")
parser.add_argument("--encoding", default="utf-8", help="Encoding to use for reading files (e.g., utf-8, latin-1).")
parser.add_argument("--errors", default="ignore", choices=['ignore', 'replace', 'strict'],
                    help="How to handle file encoding errors ('ignore', 'replace', 'strict').")


args = parser.parse_args()

# Normalize paths and create sets for faster lookup
root_dir = os.path.abspath(args.root_dir)
output_file = os.path.abspath(args.output_file)
included_extensions = set(args.extensions)
ignored_dirs = set(args.ignore_dirs)
ignored_files = set(args.ignore_files)

# --- Main Logic ---

markdown_content = []

print(f"Scanning directory: {root_dir}")
print(f"Including extensions: {', '.join(included_extensions)}")
print(f"Ignoring directories: {', '.join(ignored_dirs)}")
print(f"Ignoring files: {', '.join(ignored_files)}")
print(f"Outputting to: {output_file}")
print("-" * 20)

# Use os.walk to traverse the directory tree
for dirpath, dirnames, filenames in os.walk(root_dir, topdown=True):
    # Modify dirnames in-place to prevent descending into ignored directories
    dirnames[:] = [d for d in dirnames if d not in ignored_dirs]

    for filename in filenames:
        # Check if the file should be ignored by name
        if filename in ignored_files:
            continue

        # Check if the file extension is included
        _, ext = os.path.splitext(filename)
        if ext.lower() in included_extensions:
            file_path = os.path.join(dirpath, filename)
            relative_path = os.path.relpath(file_path, root_dir)
            language = EXTENSION_TO_LANGUAGE.get(ext.lower(), 'text') # Default to 'text' if extension not mapped

            print(f"Processing: {relative_path}")

            try:
                with open(file_path, 'r', encoding=args.encoding, errors=args.errors) as f:
                    content = f.read()

                # Add file header and code block to Markdown content
                markdown_content.append(f"## `{relative_path}`\n")
                markdown_content.append(f"```{language}\n")
                markdown_content.append(content)
                markdown_content.append("\n```\n\n") # Ensure newline after closing fence

            except Exception as e:
                print(f"  Error reading file {relative_path}: {e}")
                markdown_content.append(f"## `{relative_path}`\n")
                markdown_content.append(f"```text\n")
                markdown_content.append(f"Error reading file: {e}")
                markdown_content.append(f"\n```\n\n")

# --- Write Output File ---
try:
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("".join(markdown_content))
    print("-" * 20)
    print(f"Successfully created Markdown file: {output_file}")
except Exception as e:
    print(f"Error writing output file {output_file}: {e}")