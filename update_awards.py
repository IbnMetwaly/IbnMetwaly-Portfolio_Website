import re

TESTIMONIAL_URLS = [
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS%20%281%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS%20%282%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS%20%283%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS%20%284%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_STUDENTS%20%281%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_STUDENTS%20%282%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%281%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%281%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%282%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%282%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%283%29.jpg",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%283%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%284%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%281%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2810%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2811%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2812%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2813%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2816%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2817%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2819%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%282%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%283%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%284%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%285%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%286%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%288%29.png",
    "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%289%29.png"
]

path = 'src/pages/Awards.tsx'
with open(path, 'r') as f:
    content = f.read()

# Replace imports
content = content.replace("import { list } from '@vercel/blob';", "")

# Define TESTIMONIAL_URLS at the top level
urls_str = "const TESTIMONIAL_URLS = " + str(TESTIMONIAL_URLS) + ";"
content = re.sub(r'const VERCEL_BLOB_URL = .*?;', r'const VERCEL_BLOB_URL = import.meta.env.VITE_VERCEL_BLOB_URL || "https://yvuaka9diyhj4flq.public.blob.vercel-storage.com";\n' + urls_str, content)

# Replace useEffect
new_effect = """  useEffect(() => {
    const files = TESTIMONIAL_URLS.map((url, idx) => ({
      url,
      pathname: url.split('/').pop() || `testimonial-${idx}`
    }));
    setTestimonials(files);
    setLoading(false);
  }, []);"""

content = re.sub(r'useEffect\(\(\) => \{.*?\}, \[\]\);', new_effect, content, flags=re.DOTALL)

with open(path, 'w') as f:
    f.write(content)
