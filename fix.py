import os, re, glob

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # Update index.html#services to index.html#awards
    content = content.replace('../index.html#services', '../index.html#awards')
    content = content.replace('"#services"', '"#awards"')
    
    # Remove ecom-store references
    content = re.sub(r'<a href="ecom-store\.html">.*?</a>', '', content, flags=re.DOTALL)
    content = re.sub(r'<a href="\.\./services/ecom-store\.html">.*?</a>', '', content, flags=re.DOTALL)
    content = re.sub(r'<a href="services/ecom-store\.html">.*?</a>', '', content, flags=re.DOTALL)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filepath}')

files = glob.glob('services/*.html') + ['index.html']
for f in files:
    process_file(f)
