"use client";

import React, { useState, useEffect } from "react";
import LoadStudents from "../data/load-students";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Trophy,
  GraduationCap,
  Clock,
  Moon,
  Sun,
  House,
  CircleSlash,
} from "lucide-react";

const Summary = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = window?.localStorage?.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  const students = LoadStudents();

  const totalStudents = students.length;

  const completedCount = students.filter(
    (student) =>
      student.completed_assignments_count === 16 &&
      (student.completed_assignments?.includes(
        "Level 3: Google Cloud Adventures",
      ) ||
        student.completed_assignments?.includes("Diwali in The Arcade")),
  ).length;

  const noProgressCount = students.filter(
    (student) => student.completed_assignments === null,
  ).length;

  const noProgressPercentage =
    totalStudents > 0 ? (noProgressCount / totalStudents) * 100 : 0;

  const inProgressCount = totalStudents - (completedCount + noProgressCount);

  const completedPercentage =
    totalStudents > 0 ? (completedCount / totalStudents) * 100 : 0;

  const incompletePercentage =
    totalStudents > 0 ? (inProgressCount / totalStudents) * 100 : 0;

  const badgeCompletionCount: Record<string, number> = {};

  students.forEach((student) => {
    if (student.badges) {
      student.badges.forEach((badge) => {
        badgeCompletionCount[badge] = (badgeCompletionCount[badge] || 0) + 1;
      });
    }
  });

  const mostCompletedCourses = Object.entries(badgeCompletionCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`flex justify-center min-h-screen p-6 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-3xl w-full space-y-6">
        <Card
          className={`mx-auto w-full max-w-2xl transition duration-200 ease-in-out transform lg:hover:scale-105 shadow-lg border ${
            darkMode
              ? "border-gray-600 bg-black text-white"
              : "border-gray-700 bg-white text-gray-800"
          }`}
        >
          <CardHeader className="p-4 border-b border-gray-700">
            <CardTitle className="text-2xl font-semibold text-center">
              Progress Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div
                className={`flex justify-between items-center p-4 rounded-lg ${
                  darkMode
                    ? "border bg-white/10 hover:bg-white/20"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users
                    className={`h-5 w-5 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span className="text-sm font-medium">Total Enrolled</span>
                </div>
                <span className="text-xl font-semibold">{totalStudents}</span>
              </div>

              <div
                className={`space-y-2 p-4 rounded-lg ${
                  darkMode
                    ? "border bg-white/10 hover:bg-white/20"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GraduationCap
                      className={`h-5 w-5 ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    />
                    <span className="text-sm font-medium">Complete</span>
                  </div>
                  <span className="text-lg font-semibold">
                    {completedPercentage.toFixed(0)}% ({completedCount})
                  </span>
                </div>
                <Progress value={completedPercentage} className="h-2" />
              </div>

              <div
                className={`space-y-2 p-4 rounded-lg ${
                  darkMode
                    ? "border bg-white/10 hover:bg-white/20"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock
                      className={`h-5 w-5 ${
                        darkMode ? "text-yellow-400" : "text-yellow-600"
                      }`}
                    />
                    <span className="text-sm font-medium">In Progress</span>
                  </div>
                  <span className="text-lg font-semibold">
                    {incompletePercentage.toFixed(0)}% ({inProgressCount})
                  </span>
                </div>
                <Progress value={incompletePercentage} className="h-2" />
              </div>

              <div
                className={`space-y-2 p-4 rounded-lg ${
                  darkMode
                    ? "border bg-white/10 hover:bg-white/20"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CircleSlash
                      className={`h-5 w-5 ${
                        darkMode ? "text-red-400" : "text-red-600"
                      }`}
                    />
                    <span className="text-sm font-medium">Incomplete</span>
                  </div>
                  <span className="text-lg font-semibold">
                    {noProgressPercentage.toFixed(0)}% ({noProgressCount})
                  </span>
                </div>
                <Progress value={noProgressPercentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`mx-auto w-full max-w-2xl transition duration-200 ease-in-out transform lg:hover:scale-105 shadow-lg border ${
            darkMode
              ? "border-gray-600 bg-black text-white"
              : "border-gray-700 bg-white text-gray-800"
          }`}
        >
          <CardHeader className="p-4 border-b border-gray-700">
            <CardTitle className="text-2xl font-semibold text-center">
              Popular Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {mostCompletedCourses.map(([course, count], index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-3 mb-2 rounded-lg transition duration-150 ${
                  darkMode
                    ? "border bg-white/10 hover:bg-white/20"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-500 h-5 w-5" />
                  <span className="text-sm font-medium">{course}</span>
                </div>
                <span className="text-sm font-medium">{count} completions</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
          <Link href="/">
            <Button className="h-8 w-8 rounded-full shadow-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 px-4">
              <House className="h-4 w-4" />
            </Button>
          </Link>

          <Button
            onClick={toggleDarkMode}
            className="h-8 w-8 rounded-full shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
          >
            {darkMode ? (
              <Sun className="h-6 w-6 text-black" />
            ) : (
              <Moon className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
