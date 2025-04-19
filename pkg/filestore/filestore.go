package filestore

import (
	"errors"
	"io"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
)

type FileStore struct {
	BasePath string
}

// New creates a new FileStore instance and initializes the storage directory.
func New(basePath string) *FileStore {
	if err := os.MkdirAll(basePath, 0755); err != nil {
		log.Fatalf("Unable to create storage directory: %v", err)
	}

	return &FileStore{
		BasePath: basePath,
	}
}

// Save saves the uploaded file to the storage directory and returns its generated filename.
func (fs *FileStore) Save(file *multipart.FileHeader) (string, error) {
	ext := filepath.Ext(file.Filename)
	if !fs.isAllowedExtension(ext) {
		return "", errors.New("file type not allowed")
	}

	filename := uuid.New().String() + filepath.Ext(file.Filename)
	dstPath := filepath.Join(fs.BasePath, filename)

	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	dst, err := os.Create(dstPath)
	if err != nil {
		return "", err
	}
	defer dst.Close()

	if _, err = io.Copy(dst, src); err != nil {
		return "", err
	}

	return filename, nil
}

// Get reads and returns the content of the specified file.
func (fs *FileStore) Get(filename string) ([]byte, error) {
	return os.ReadFile(filepath.Join(fs.BasePath, filename))
}

// Exists checks if the specified file exists in the storage directory.
func (fs *FileStore) Exists(filename string) bool {
	_, err := os.Stat(filepath.Join(fs.BasePath, filename))
	return !os.IsNotExist(err)
}

// Delete removes the specified file from the storage directory.
func (fs *FileStore) Delete(filename string) error {
	return os.Remove(filepath.Join(fs.BasePath, filename))
}

// Size returns the size of the specified file in bytes.
func (fs *FileStore) Size(filename string) (int64, error) {
	info, err := os.Stat(filepath.Join(fs.BasePath, filename))
	if err != nil {
		return 0, err
	}
	return info.Size(), nil
}

// SaveTestFile creates a test file with predefined content in the storage directory.
func (fs *FileStore) SaveTestFile() error {
	testPath := filepath.Join(fs.BasePath, "test.txt")
	return os.WriteFile(testPath, []byte("Test content"), 0644)
}

// isAllowedExtension checks if the file extension is allowed.
func (fs *FileStore) isAllowedExtension(ext string) bool {
	allowed := map[string]bool{
		".png": true, ".jpg": true, ".jpeg": true,
		".pdf": true, ".docx": true, ".mp4": true,
	}
	return allowed[strings.ToLower(ext)]
}
