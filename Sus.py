import tkinter as tk
from tkinter import messagebox
import math

# Initialize the main window
root = tk.Tk()
root.title("Scientific Calculator")
root.geometry("400x600")

# Display widget
display = tk.Entry(root, font=("Arial", 20), borderwidth=5, relief="sunken")
display.grid(row=0, column=0, columnspan=5, padx=10, pady=10, ipadx=8, ipady=8)

# Button click function
def button_click(value):
    current_text = display.get()
    display.delete(0, tk.END)
    display.insert(0, current_text + str(value))

# Clear function
def button_clear():
    display.delete(0, tk.END)

# Equals function
def button_equal():
    try:
        result = eval(display.get())
        display.delete(0, tk.END)
        display.insert(0, result)
    except Exception as e:
        messagebox.showerror("Error", f"Invalid Input\n{e}")
        display.delete(0, tk.END)

# Button layout
button_list = [
    '7', '8', '9', '/', 'sqrt',
    '4', '5', '6', '*', 'pow',
    '1', '2', '3', '-', 'log',
    '0', '.', '=', '+', 'clear'
]

row = 1
col = 0

for button in button_list:
    if button == 'clear':
        tk.Button(root, text=button, width=10, height=3, command=button_clear).grid(row=row, column=col)
    elif button == '=':
        tk.Button(root, text=button, width=10, height=3, command=button_equal).grid(row=row, column=col)
    elif button == 'sqrt':
        tk.Button(root, text=button, width=10, height=3, command=lambda: button_click('math.sqrt(')).grid(row=row, column=col)
    elif button == 'pow':
        tk.Button(root, text=button, width=10, height=3, command=lambda: button_click('**')).grid(row=row, column=col)
    elif button == 'log':
        tk.Button(root, text=button, width=10, height=3, command=lambda: button_click('math.log(')).grid(row=row, column=col)
    else:
        tk.Button(root, text=button, width=10, height=3, command=lambda value=button: button_click(value)).grid(row=row, column=col)
    
    col += 1
    if col > 4:
        col = 0
        row += 1

# Run the main event loop
root.mainloop()
