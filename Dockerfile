# Use the official Python image from the Docker Hub
FROM python:3

# Set the working directory inside the container

WORKDIR /usr/src/app

COPY requirements.txt requirements.txt


# Install Django and any other dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Expose the port that the Django development server will run on
EXPOSE 8000

# Command to run the Django development server
# Use the official Python image from the Docker Hub
FROM python:3

# Set the working directory inside the container

WORKDIR /usr/src/app

COPY requirements.txt requirements.txt


# Install Django and any other dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Expose the port that the Django development server will run on
EXPOSE 8000

# Command to run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]



