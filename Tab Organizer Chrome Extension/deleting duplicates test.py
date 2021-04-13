bruh = [1, 2, 2, 4, 5, 9]
n = 0
print(bruh)
for i in bruh:
    if bruh[n] == bruh[n+1]:
        bruh.pop(n+1)
    n += 1

print(bruh)
    
    