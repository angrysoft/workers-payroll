# Generated by Django 4.0.4 on 2022-05-02 08:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Addition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Name')),
                ('value', models.IntegerField(default=0)),
                ('is_multiplied', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='AdditionsRates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Event name')),
                ('number', models.CharField(max_length=50, unique=True, verbose_name='Event number')),
            ],
        ),
        migrations.CreateModel(
            name='EventDayWork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Function',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Name')),
            ],
            options={
                'verbose_name': 'Function',
            },
        ),
        migrations.CreateModel(
            name='FunctionRate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField(default=0)),
                ('overtime', models.IntegerField()),
                ('function', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='payroll.function')),
            ],
        ),
    ]
