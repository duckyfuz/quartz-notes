`max_tokens` and `logit_bias for llm completions (openai)
```
max_tokens=1,  
logit_bias={"15": 100, "16": 100}, # Token ID for `0` # Token ID for `1`
```

> [!warning] gemini does not support `logit_bias` parameter


openai has cool moderation fn
```
response = client.moderations.create(  
    model="omni-moderation-latest",   
    input=text_to_moderate  
)  
  
# Check if the content is flagged  
is_flagged = response.results[0].flagged  
print(is_flagged) # Outputs: True or False
```

additional info: https://medium.com/dsaid-govtech/from-risk-to-resilience-adding-llm-guardrails-from-day-1-4c55e9cd6693
- localized moderation classifier
- input: using classifiers for PII, jailbreak attempts, off-topic prompts
- output: check via work overlap, using classifiers to check that responses are grounded in RAG context