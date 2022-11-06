package com.verduttio.cinemaapp.entity;

public class RatingInfo {
    private double rating;
    private int numberOfVotes;

    public RatingInfo(double rating, int numberOfVotes) {
        this.rating = rating;
        this.numberOfVotes = numberOfVotes;
    }

    public RatingInfo(){};


    public int getNumberOfVotes() {
        return numberOfVotes;
    }

    public void setNumberOfVotes(int numberOfVotes) {
        this.numberOfVotes = numberOfVotes;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
