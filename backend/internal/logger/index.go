package logger

import (
	"log"
	"path/filepath"
	"runtime"
	"strings"
)

var (
	LogE = log.New(LogWriter{}, "ERROR: ", 0)
	LogW = log.New(LogWriter{}, "WARN: ", 0)
	LogI = log.New(LogWriter{}, "INFO: ", 0)
)

type LogWriter struct{}

func (f LogWriter) Write(p []byte) (n int, err error) {
	pc, file, line, ok := runtime.Caller(4)
	if !ok {
		file = "?"
		line = 0
	}

	fn := runtime.FuncForPC(pc)
	var fnName string
	if fn == nil {
		fnName = "?()"
	} else {
		dotName := filepath.Ext(fn.Name())
		fnName = strings.TrimLeft(dotName, ".") + "()"
	}

	log.Printf("%s:%d %s: %s", filepath.Base(file), line, fnName, p)
	return len(p), nil
}

func InfoFunc(msg ...interface{}) {
	LogI.Println(msg...)
}

func WarnFunc(msg ...interface{}) {
	LogW.Println(msg...)
}

func ErrorFunc(msg ...interface{}) {
	LogE.Println(msg...)
}
