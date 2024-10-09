'use client'
import React, { useState } from 'react';
import {
    Container,
    Typography,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    FormControl,
    InputLabel,
    Box,
    CircularProgress,
    Alert
  } from '@mui/material';

  interface Exercise {
    name: string;
    type: string;
    muscle: string;
    difficulty: string;
    instructions: string;
  }

  const WorkoutPlanner = () => {
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [targetMuscle, setTargetMuscle] = useState('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError ] = useState('');

    const fetchExercises = async (muscle, difficulty) => {
        const response = await fetch(`/api/exercises?muscle=${muscle}&difficulty=${difficulty}`);

        if (!response.ok) {
            throw new Error('Failed to fetch exercises');
        }
        return response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const fetchedExercises = await fetchExercises(targetMuscle, fitnessLevel);
            setExercises(fetchedExercises);

        } catch (error) {
            console.error('Error fetching exercises:', error);
            setError('Failed to fetch exercises. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Personalized Workout Planner
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="fitness-level-label">Fitness Level</InputLabel>
          <Select
            labelId="fitness-level-label"
            value={fitnessLevel}
            label="Fitness Level"
            onChange={(e) => setFitnessLevel(e.target.value)}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="target-muscle-label">Target Muscle</InputLabel>
          <Select
            labelId="target-muscle-label"
            value={targetMuscle}
            label="Target Muscle"
            onChange={(e) => setTargetMuscle(e.target.value)}
          >
            <MenuItem value="chest">Chest</MenuItem>
            <MenuItem value="back">Back</MenuItem>
            <MenuItem value="legs">Legs</MenuItem>
            <MenuItem value="shoulders">Shoulders</MenuItem>
            <MenuItem value="arms">Arms</MenuItem>
            <MenuItem value="core">Core</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? <CircularProgress size={24} /> : 'Generate Workout Plan'}
        </Button>
      </Box>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Grid container spacing={3}>
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`/api/placeholder/400/300?text=${encodeURIComponent(exercise.name)}`}
                alt={`${exercise.name} demonstration`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {exercise.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Type:</strong> {exercise.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Muscle:</strong> {exercise.muscle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Difficulty:</strong> {exercise.difficulty}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Instructions:</strong> {exercise.instructions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    );
  };

  export default WorkoutPlanner