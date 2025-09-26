import google.generativeai as genai
import time
import json
from google.api_core.exceptions import ResourceExhausted
import os


api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY is not set")
genai.configure(api_key=api_key)

def ask_llm(promt, max_retries=3, base_delay=60):
    
    for attempt in range(max_retries):
        try:
            model = genai.GenerativeModel('gemini-2.5-pro')
            response = model.generate_content(promt)
            
            response_text = response.text
            
            if response_text.startswith('```json'):
                response_text = response_text.replace('```json', '').replace('```', '').strip()
            
            parsed_response = json.loads(response_text)
            return parsed_response.get('plans', [])
            
        except ResourceExhausted as e:
            if attempt < max_retries - 1:
                retry_delay = base_delay
                if hasattr(e, 'retry_delay') and e.retry_delay:
                    retry_delay = e.retry_delay.seconds
                
                print(f"Rate limit exceeded. Waiting {retry_delay} seconds before retry {attempt + 1}/{max_retries}")
                time.sleep(retry_delay)
            else:
                print("Max retries reached. Rate limit still exceeded.")
                raise e
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Response text: {response_text}")
            raise e
        except Exception as e:
            print(f"Unexpected error: {e}")
            raise e
    
    return []